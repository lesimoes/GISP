const { St, Clutter, GObject, GLib } = imports.gi;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Util = imports.misc.util;
const { Gtk } = imports.gi;
const gtkVersion = Gtk.get_major_version();

let panelButton;

const Indicator = GObject.registerClass(
  class Indicator extends PanelMenu.Button {
    _init() {
      super._init(0.0, _('My Shiny Indicator'));

      this.add_child(
        new St.Label({
          text: '🔥',
          y_align: Clutter.ActorAlign.CENTER,
          x_align: Clutter.ActorAlign.CENTER,
        })
      );

      let item = new PopupMenu.PopupMenuItem('Settings');
      item.connect('activate', () => {
        Main.notify(_('whats up, folks?'));
        ExtensionUtils.openPrefs();
      });

      this.menu.addMenuItem(item);
    }
  }
);

function init() {}

function enable() {
  this.indicator = new Indicator();
  Main.panel.addToStatusArea(this, this.indicator);
}

function disable() {
  this.indicator.destroy();
  this.indicator = null;
}
