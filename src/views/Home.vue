<template>
    <div class="ex1">
        <h1>Momma's Place Restaurant</h1>
        <h2>a Northern California Eatery</h2>

        <div style="text-align:left;width:800px;margin:0 auto">
            <ul>
                <li>
                    <router-link to="/">Home Page</router-link>
                    <span>
                        This is the main landing
                    </span>
                </li>
                <li>
                    <router-link to="/Menu">Sample Menu Page</router-link>
                    <span>
                        This page has three example menu items (Add to Cart
                        works!)
                    </span>
                </li>
                <li>
                    <router-link to="/Cart">Cart Page</router-link>
                    <span>
                        This page shows the items in the cart
                    </span>
                </li>
                <li>
                    <router-link to="/Login">Login Page</router-link>
                    <span>
                        This page is for customers to login
                    </span>
                </li>
                <li>
                    <router-link to="/Register">Cart Page</router-link>
                    <span>
                        This page is for customers to register to place orders
                    </span>
                </li>
            </ul>
        </div>
        <div class="first">
            <p>
                Ceaser Salad<span class="price">$14</span><br />
                <small>
                    romaine lettuce, extra virgin olive oil, garlic, baguette,
                    lemon juice, Parmesan cheese, anchovies, eggs, black pepper,
                    salt
                </small>
            </p>
        </div>
        <br>
        <span></span>

        <div class="second">
            <p>
                Fettuccini Alfredo <span class="price">$22</span><br />
                <small
                    >fettuccine, broccoli florets, garlic, butter, all-purpose
                    flour, milk, grated parmesan, nutmeg, salt, pepper</small
                >
            </p>
        </div>
        <br>
        <div class="dessert">
            <p>
                Grilled Stone Fruit Parfait<span class="price">$8</span><br />
                <small
                    >nectarines (halved), black plums (halved), cherries (pitted
                    and halved), fresh, all- natrual vanilla yogurt</small
                >
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Home',
    components: {}
};
</script>
<style scoped>
body {
    font-family: helvetica, sans-serif;
    margin: 0 auto;
    max-width: 600px;
    background: #232323;
}
div {
    height: 200px;
    background-size: cover;
    position: relative;
    margin: 40px 0 0 0;
    border-radius: 12px;
}
h1 {
    font-family: 'Love Ya Like A Sister', cursive;
    text-align: center;
    font-size: 75px;
    color: #aaaaaa;
    margin: 60px 0 0 0;
}
h2 {
    text-align: center;
    color: #bbbbbb;
    margin: 0px 0 70px 0;
}
p {
    color: rgba(255, 255, 255, 1);
    background: black;
    background: linear-gradient(bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4));
    background: -webkit-linear-gradient(
        bottom,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0.4)
    );
    background: -moz-linear-gradient(
        bottom,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0.4)
    );
    padding: 10px;
    line-height: 28px;
    text-align: justify;
    position: absolute;
    bottom: 0;
    margin: 0;
    height: 30px;
    transition: height 0.5s;
    -webkit-transition: height 0.5s;
    -moz-transition: height 0.5s;
}

small {
    opacity: 0;
}

.show-description p {
    height: 150px;
}

.show-description small {
    opacity: 1;
}
.first {
    background-image: url('http://blog.fairwaymarket.com/wp-content/uploads/2013/07/caesar-salad.jpg');
    margin: auto;
    width: 50%;
    padding: 10px;
}
.second {
    background-image: url('http://www.budgetbytes.com/wp-content/uploads/2012/02/Broccoli-Fettuccine-close.jpg');
    margin: auto;
    width: 50%;
    padding: 10px;
}
.dessert {
    background-image: url('https://3.bp.blogspot.com/-ga7Qrvibqmk/Uc9VCMovdDI/AAAAAAAAFG4/uCr_KFGLWQ0/s500/Grilled+Stone+Fruit+Parfait_Overhead+View-1-5.jpg');
    margin: auto;
    width: 50%;
    padding: 10px;
}
.price {
    float: right;
    font-weight: bold;
}
@media (max-width: 500px) {
    h1 {
        font-size: 50px;
        margin-top: 20px;
        line-height: 40px;
    }
    h2 {
        font-size: 20px;
        margin: 20px 0 30px 0;
    }
    a {
        font-size: 20px;
        margin: 20px 0 30px 0;
    }
    div {
        margin: 20px 12px 0 12px;
    }
    .ex1 {
        width: 10px;
        margin: auto;
        border: 3px solid #73ad21;
    }
    p {
        font-size: 20px;
        line-height: 24px;
    }
    small {
        font-size: 16px;
    }
}
div.topBotomBordersOut a:before,
div.topBotomBordersOut a:after {
    position: absolute;
    left: 0px;
    width: 100%;
    height: 2px;
    background: #fff;
    content: '';
    opacity: 0;
    transition: all 0.3s;
}
</style>
