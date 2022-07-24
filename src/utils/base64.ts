export function base64(type: "encode" | "decode", payload: any) {
  const crypt = {
    encode: () => btoa(JSON.stringify(payload)),
    decode: () => JSON.parse(atob(String(payload))),
  };
  return crypt[type]();
}
