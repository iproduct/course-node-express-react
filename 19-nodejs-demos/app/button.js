export class Button {
    constructor(title, onClick, enabled) {
        this._onClick = onClick;
        this._enabled = enabled;
        this._element = document.createElement('button');
        this._element.innerHTML = title;
        this._element.onclick = this._onClick;
        this.enable()
    }
    getElement() {
        return this._element;
    }

    enable() {
        this._element.className = 'btn btn-primary';
        this._element.disabled = false;
    }

    disable() {
        this._element.className = 'btn btn-primary btn-disabled';
        this._element.disabled = true;
    }
}