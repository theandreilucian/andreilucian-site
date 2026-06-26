/* Runs in <head> before product-gate — unlock from homepage redirect (#access=160299) */
(function () {
  var key = "x1k_product_unlock";
  var pass = "160299";
  var params = new URLSearchParams(location.search);
  var hash = (location.hash || "").replace(/^#/, "").toLowerCase();
  var hashCode = hash === "access=" + pass;
  var fromRedirect =
    params.get("unlocked") === "1" ||
    hash === "unlocked" ||
    hash.indexOf("unlocked=") === 0 ||
    hashCode;
  if (!fromRedirect) return;

  window.__X1K_UNLOCKED__ = true;
  try {
    localStorage.setItem(key, "1");
  } catch (e) {}
  try {
    sessionStorage.setItem(key, "1");
  } catch (e) {}
})();
