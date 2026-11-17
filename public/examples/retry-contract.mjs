// Authored sequential teaching model. No database, network, payments or AI calls.
// It is not the repository's production implementation or a concurrency model.
export function createRetryModel(initialStock = 20) {
  if (!Number.isInteger(initialStock) || initialStock < 0) throw Error('Use a nonnegative integer stock.');
  let stock = initialStock;
  const orders = new Map();
  return {
    submit(key, payload) {
      if (typeof key !== 'string' || !key.trim() || key.length > 80) throw Error('Supply a stable request key.');
      if (typeof payload !== 'string' || !payload || payload.length > 200) throw Error('Supply a short payload string.');
      const old = orders.get(key);
      if (old) return old.payload === payload ? { status: 200, id: old.id } : { status: 409, id: null };
      if (stock < 2) return { status: 409, id: null };
      const id = 'order-' + (orders.size + 1);
      orders.set(key, { id, payload });
      stock -= 2;
      return { status: 201, id };
    },
    inspect() { return { orderCount: orders.size, stock }; },
  };
}
export function runRetryExample(mode = 'same-key') {
  if (!['same-key', 'changed-payload', 'new-key'].includes(mode)) throw Error('Unknown teaching example.');
  const model = createRetryModel();
  const first = model.submit('request-1', 'two notebooks');
  const retry = model.submit(mode === 'new-key' ? 'request-2' : 'request-1', mode === 'changed-payload' ? 'different content' : 'two notebooks');
  return { mode, first, retry, ...model.inspect(), singleEffect: model.inspect().orderCount === 1 && model.inspect().stock === 18 };
}
export function checkRetryExamples() {
  const replay = runRetryExample(), changed = runRetryExample('changed-payload'), differentKey = runRetryExample('new-key');
  if (replay.first.status !== 201 || replay.retry.status !== 200 || replay.first.id !== replay.retry.id || !replay.singleEffect) throw Error('Replay contract failed.');
  if (changed.retry.status !== 409 || !changed.singleEffect) throw Error('Changed-payload contract failed.');
  if (differentKey.orderCount !== 2 || differentKey.stock !== 16 || differentKey.singleEffect) throw Error('Different keys should represent separate operations in this model.');
  return { scope: 'Authored sequential model only; no services executed.', replay, changed, differentKey };
}
if (typeof process !== 'undefined' && process.argv?.[1]?.endsWith('/retry-contract.mjs')) console.log(JSON.stringify(checkRetryExamples(), null, 2));
