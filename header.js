class headercomponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                
                :root {
                    --primary-color: #686cf6;
                    --primary-dark: #554fcf;
                    --text-color: #333;
                    --light-gray: #f1f1f1;
                    --border-color: #ddd;
                    --hover-color: #4e4ec5;
                    --footer-text: #bfbfbf;
                    --max-width: 1200px;
                }
                
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                    padding-top: 80px;
                }
                
                main {
                    flex-grow: 1;
                    min-height: 30vh;
                    max-width: var(--max-width);
                    margin: 0 auto;
                }
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 2;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: var(--light-gray);
                    padding: 20px 40px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    min-height: 80px;
                }
                
                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    height: 100%;
                }
                
                .header a {
                    color: var(--text-color);
                    text-decoration: none;
                    font-size: 14px;
                    line-height: 25px;
                    display: flex;
                    align-items: center;
                }
                
                /* Profile image styles */
                .profile-img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 2px solid var(--primary-color);
                    object-fit: cover;
                    background-color: var(--light-gray);
                    cursor: pointer;
                    vertical-align: middle;
                }
                .header a.logo {
                    font-size: 16px;
                    font-weight: bold;
                }
                
                .header a:hover {
                    color: var(--primary-color);
                }
                
                .header-right a:hover .profile-img {
                    border-color: var(--hover-color);
                }
            </style>

            <div class="header">
                <a href="#default" class="logo">Лого</a>
                <div class="header-right">
                <a href="profile.html">
                <img src="profile.jpg" class="profile-img"></a>
                <button class="active" href="#home">Гарах</button>
                <a href="#contact">Холбогдох</a>
                <a href="#about">Бидний тухай</a>
                <button onclick="toggleCart()">Сагс харах (<span id="cart-count">0</span>)</button>
                </div>
            </div>
        `;
    }
}
customElements.define('header-component', headercomponent);
