class footercomponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                    .footer {
                        width: 100%;
                        background: #686cf6;
                        padding: 2rem 4rem;
                    }

                    .footer-row {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 2rem;
                        width: 100%;
                        justify-content: center;
                    }

                    .footer-row .footer-col h4 {
                        color: #fff;
                        font-size: 1.2rem;
                        font-weight: 400;
                    }

                    .footer-col .links {
                        margin-top: 1.25rem;
                    }

                    .footer-col .links li {
                        list-style: none;
                        margin-bottom: 0.625rem;
                    }

                    .footer-col .links li a {
                        text-decoration: none;
                        color: #bfbfbf;
                    }

                    .footer-col .links li a:hover {
                        color: #fff;
                    }

                    .footer-col p {
                        margin: 1.25rem 0;
                        color: #bfbfbf;
                        max-width: 300px;
                    }

                    .footer-col form {
                        display: flex;
                        gap: 0.3125rem;
                    }

                    .footer-col input {
                        height: 2.5rem;
                        border-radius: 0.375rem;
                        width: 100%;
                        outline: none;
                        border: 1px solid #7489C6;
                        caret-color: #fff;
                        color: #fff;
                        padding-left: 0.625rem;
                    }

                    .footer-col input::placeholder {
                        color: #ccc;
                    }

                    .footer-col form button {
                        background: #686cf6;
                        border: 1px #fff;
                        padding: 0.625rem 1rem;
                        border-radius: 0.375rem;
                        cursor: pointer;
                        font-weight: 500;
                        transition: 0.2s ease;
                    }
                    .footer-col form button:hover {
                        background: #fff;
                        color: #333;
                    }

                    .footer-col .icons {
                        display: flex;
                        margin-top: 1.875rem;
                        gap: 1.875rem;
                        cursor: pointer;
                    }

                    .footer-col .icons i {
                        color: #afb6c7;
                    }

                    .footer-col .icons i:hover {
                        color: #fff;
                    }
            </style>
                <footer class="footer">
            <div class="footer-row">
            <section class="footer-col">
                <h4>Info</h4>
                <nav>
                <ul class="links">
                    <li><a href="#">Бидний тухай</a></li>
                    <li><a href="#">Шахалтууд</a></li>
                    <li><a href="#">Үйлчлүүлэгчид</a></li>
                    <li><a href="#">Үйлчилгээ</a></li>
                    <li><a href="#">Цуглуулга</a></li>
                </ul>
                </nav>
            </section>
                <section class="footer-col">
                    <h4>Судлах</h4>
                    <nav>
                    <ul class="links">
                        <li><a href="#">Үнэгүй Дизайнууд</a></li>
                        <li><a href="#">Сүүлийн Дизайнууд</a></li>
                        <li><a href="#">Загварууд</a></li>
                        <li><a href="#">Алдартай Дизайнууд</a></li>
                        <li><a href="#">Шинээр нэмэгдсэн</a></li>
                    </ul>
                    </nav>
                </section>
                
                <section class="footer-col">
                    <h4>Хууль эрх зүй</h4>
                    <nav>
                    <ul class="links">
                        <li><a href="#">Хэрэглэгчийн Гэрээ</a></li>
                        <li><a href="#">Нууцлалын Бодлого</a></li>
                        <li><a href="#">Аюулгүй байдал</a></li>
                        <li><a href="#">Сэтгэгдлүүд</a></li>
                        <li><a href="#">Медиа Багц</a></li>
                    </ul>
                    </nav>
                </section>
                </nav>
            </section>

            <section class="footer-col">
                <h4>Зар мэдээ</h4>
                <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. A accusamus temporibus numquam, 
                facilis iusto ipsum sequi, fuga est qui quasi rem architecto optio aperiam assumenda.
                </p>
                <form action="#">
                <input type="text" placeholder="Your email" required />
                <button type="submit">SUBSCRIBE</button>
                </form>
                <div class="icons">
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-linkedin"></i>
                <i class="fa-brands fa-github"></i>
                </div>
            </section>
            </div>
        </footer>
        `;
    }
}
customElements.define('footer-component', footercomponent);
