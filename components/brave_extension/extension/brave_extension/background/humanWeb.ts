declare const CLIQZ: any; // this is a global injected by humanweb

chrome.braveHumanWeb.getEnabled((enabled: boolean) => {
  const prefs = CLIQZ.app.prefs;
  if (enabled) {
    prefs.set("modules.human-web.enabled", true);
    prefs.set("modules.hpnv2.enabled", true);
  } else {
    prefs.set("modules.human-web.enabled", false);
    prefs.set("modules.hpnv2.enabled", false);
  }
})
