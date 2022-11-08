import React from 'react'
import "./CartView.css"
import CartViewEntry from './CartViewEntry'


export default function CartView(props) {
    return (props.trigger) ? (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/animatecss/3.5.2/animate.min.css"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
            <link href='https://fonts.googleapis.com/css?family=Parisienne' rel='stylesheet'></link>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
            <script src="https://kit.fontawesome.com/0b9f4346c0.js" crossorigin="anonymous"></script>
            <script>
                new WOW().init();
            </script>

            <div className = "popup">
                <div className = "popup-inner">
                <div class="cart-view">
                <div class="container" style={{ "min-height": "35vh" }}>
                    <div class="row top-panel">
                        <div class="col">
                            <button>
                                Remove
                            </button>
                        </div>
                        <div class="col justify-content-end d-flex">
                            <button>
                                Edit Item
                            </button>
                        </div>
                    </div>


                    {props.orderTicket && props.orderTicket.getItems.map((item) =>
                        <div class="row">
                            <CartViewEntry name={item.getProduct.getName} size={item.getItemSize} price={item.getProduct.getPrice} quantity={item.getItemAmount}></CartViewEntry>
                        </div>
                    )}

                    <div class="row">
                        <div class="col justify-content-end d-flex">
                            <button>
                                Checkout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
                </div>
            </div>
           
        </>
    ) : "";
}


//make customer view component