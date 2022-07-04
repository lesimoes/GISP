/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = 'my-indicator-extension';

const { GObject, St, Clutter } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const uuid = imports.misc.extensionUtils.getCurrentExtension().uuid;
const sanitize = (s) => s.replace(/[^a-z0-9+_-]/gi, '_'); // Useless since GS 3.36

const _ = ExtensionUtils.gettext;

const Indicator = GObject.registerClass(
  class Indicator extends PanelMenu.Button {
    _init() {
      super._init(0.0, _('My Shiny Indicator'));

      this.add_child(
        new St.Icon({
          icon_name: 'face-smile-symbolic',
          style_class: 'system-status-icon',
        })
      );

      let item = new PopupMenu.PopupMenuItem(_('Show Notification'));
      item.connect('activate', () => {
        Main.notify(_('Whats up, lele?'));
        log('===== Nice log message =====');
      });
      this.menu.addMenuItem(item);
    }
  }
);

const ButtonNew = GObject.registerClass(
  class ButtonNew extends PanelMenu.Button {
    _init() {
      super._init(0.0, _('TESTE'));

      let button = new St.bin({
        style_class: 'panel-button',
      });

      log('=======================================', button);
      button.set_child(
        new St.Label({
          text: 'Oiii',
          y_align: Clutter.ActorAlign.CENTER,
        })
      );

      Main.panel_rightBox.insert_child_at(button, 0);
    }
  }
);

class Extension {
  constructor(uuid) {
    this._uuid = uuid;
    log('INIT');
    ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
  }

  enable() {
    this._indicator = new Indicator();
    log('ENABLE');
    //this._button = new ButtonNew();
    Main.panel.addToStatusArea(this._uuid, this._indicator);
  }

  disable() {
    this._indicator.destroy();
    this._indicator = null;
  }
}

function init(meta) {
  return new Extension(uuid);
}
