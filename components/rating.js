class Rating extends HTMLElement {

    get value() {
        return this.getAttribute("heart");
    }

    set value(newValue) {
        this.setAttribute('heart', newValue);
        this.icons.forEach((icon, index) => icon.style.color = index >= newValue ? 'black' : 'red')
    }

    constructor() {
        super()
        this.hearts = new Array()
        const shadowRoot = this.attachShadow({mode: "open"})

        shadowRoot.innerHTML = `
        <style>
          :host i {
            color: black;
            font-size: 3rem;
            cursor: pointer;
          }
        </style>
      `;


        const container = document.createDocumentFragment()
        
        const icons = Array.from({ length: 5 }, () => {
            const icon = document.createElement("i")
            icon.append('\u2665')    
            return icon
        })

        this.icons = icons

        icons.forEach((icon, index) => {
            container.append(icon)
          
            icon.onclick = () => {
                this.value = index + 1
            }
        })

        shadowRoot.append(container);
        this.container = container
    }
}

customElements.define("rating-heart", Rating)