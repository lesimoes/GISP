const { GObject, Gtk, Gdk, Adw } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = imports.misc.extensionUtils.getCurrentExtension();

function init() {}

function fillPreferencesWindow(window) {
  let builder = Gtk.Builder.new();
  builder.add_from_file(`${Me.path}/prefs.ui`);

  let page = builder.get_object('my_page');
  window.set_default_size(400, 180);
  window.add(page);
}

const MyPrefsWidget = GObject.registerClass(
  {
    Template: `${Me.dir.get_child('prefs.ui').get_uri()}`,
  },
  class MyPrefsWidget extends Adw.PreferencesWindow {
    _init() {
      super._init();
      log(`${Me.path}/prefs.ui`);

      fillPreferencesWindow(this);
    }
  }
);
