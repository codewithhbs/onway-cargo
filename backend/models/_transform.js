// Shared helpers so MongoDB documents serialise EXACTLY like the old JSON store
// (id instead of _id, created_at / updated_at as "YYYY-MM-DD HH:MM:SS", no __v).

function pad(n) { return String(n).padStart(2, '0'); }

function fmt(d) {
  if (!d) return undefined;
  const x = new Date(d);
  return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())} ` +
         `${pad(x.getHours())}:${pad(x.getMinutes())}:${pad(x.getSeconds())}`;
}

// Standard toJSON transform: _id -> id, timestamps -> snake_case, drop password/__v
function baseTransform(doc, ret) {
  ret.id = ret._id ? String(ret._id) : ret.id;
  delete ret._id;
  delete ret.__v;
  delete ret.password;
  if (ret.createdAt) { ret.created_at = fmt(ret.createdAt); delete ret.createdAt; }
  if (ret.updatedAt) { ret.updated_at = fmt(ret.updatedAt); delete ret.updatedAt; }
  return ret;
}

const toJSONOpts = { virtuals: false, versionKey: false, transform: baseTransform };

module.exports = { fmt, baseTransform, toJSONOpts };
