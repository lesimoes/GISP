const { St, Clutter } = imports.gi;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;

let panelButton;

function init() {
  // Create a Button with "Hello World" text
  panelButton = new St.Bin({
    style_class: 'panel-button',
  });
  let panelButtonText = new St.Label({
    text: '🔥',
    y_align: Clutter.ActorAlign.CENTER,
  });

  // let item = new PopupMenu.PopupMenuItem(_('Show Notification'));
  // item.connect('activate', () => {
  //   Main.notify(_('Whats up, lele?'));
  // });
  //panelButton.menu.addMenuItem(item);
  panelButton.set_child(panelButtonText);
}

function enable() {
  // Add the button to the panel
  Main.panel._rightBox.insert_child_at_index(panelButton, 0);
}

function disable() {
  // Remove the added button from panel
  Main.panel._rightBox.remove_child(panelButton);
}
