import { KeyboardShortcut } from '@csnext/cs-core';

export class KeyboardManager {

    private shortcuts: KeyboardShortcut[] = [];

    public init() {
        window.addEventListener('keyup', event => {
            for (const shortcut of this.shortcuts) {
                if (shortcut._callback && event.code === shortcut.code) {
                    shortcut._callback();
                }
            }
        });
    }

    public register(shortcut: KeyboardShortcut) {
        this.shortcuts.push(shortcut);
    }

    public registerShortcut(id: string, code: string, callback: Function, alt?: boolean, shift?: boolean, ctrl?: boolean) {
        let existing = this.shortcuts.find(sc => sc.id === id);
        if (!existing) {
            this.shortcuts.push({ id: id, code: code, _callback: callback, alt: alt, shift: shift, ctrl: ctrl });
        }
    }

}