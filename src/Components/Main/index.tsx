import React from 'react';
import './style.sass'
import Logo from './img/logo.svg'
import Basket from './img/basket.svg'
import { getProducts } from '../../server/axios/fetchers/projectFetchers'
import { ListShop } from '../../type'
import BasketCart from './img/basket_cart.svg'
import { Shipping, Tax } from "../../const";
import Close from './img/close.svg';

const Main = () => {
    const [list, setList] = React.useState<Array<ListShop>>([]);
    const [listBasket, setListBasket] = React.useState<Array<ListShop>>([]);
    const [price, setPrice] = React.useState<number>(0);
    const [information, setInformation] = React.useState<ListShop>();
    const [informationShow, setInformationShow] = React.useState(false);
    const [basketShow, setBasketShow] = React.useState(true);
    React.useEffect(() => {
      (async ()=>{
         setList(await getProducts())
      })()
    }, []);

    const countTotalPrice = (newListBasket: Array<ListShop>) => {
        let totalPrice = 0;
        newListBasket.forEach((value) => totalPrice += value.count * value.sum)
        setPrice(totalPrice)
    }

    const addBasket = (id: number) => {
        list.forEach((value) => {
            if (value.id === id){
                let newListBasket = [...listBasket];
                let isInBasket = false;
                newListBasket.forEach((valueList)=>{
                    if (valueList.id === id) {
                        valueList.count += 1
                        isInBasket = true;
                    }
                })
                if (!isInBasket) {
                    newListBasket?.push(value);
                }
                setListBasket(newListBasket);
                countTotalPrice(newListBasket);
            }
        })
        setBasketShow(true)
    }

    const deleteBasketProducts = (index: number) => {
        listBasket.forEach((value, indexList) => {
            let newListBasket = [...listBasket];
            if (indexList === index){
                value.count -= 1;
                if (value.count <= 0) {
                    let newArray = newListBasket.filter((valueList, indexList) => indexList !== index)
                    setListBasket(newArray);
                }
            }
            countTotalPrice(newListBasket);
        })
    }
    const openInformation = (index: number) => {
        let currentElement = list.find((_, i) => i === index);
        setInformation(currentElement);
        setInformationShow(true)
    }
    return (
        <div className='main'>
            <div className="main_header">
                <div className="main_logo">
                    <img src={Logo} alt="Logo" />
                    <p>.shop</p>
                </div>
                <div className="main_basket">
                    <img src={Basket} alt="Basket" />
                    <p>{listBasket.length}</p>
                </div>
            </div>
            <div className="main_content">
                {!informationShow &&
                    <div className="main_products">
                        {
                            list?.map((value, index)=>
                                <div onClick={()=>openInformation(index)} className='main_container'>
                                    <img src={value.img} />
                                    <div className='main_container-title'>{value.title}</div>
                                    <div className="main_container-basket">
                                        <img
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addBasket(value.id);
                                            }}
                                            src={BasketCart}
                                            alt="BasketCart"
                                        />
                                        <p>$ {value.sum}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
                {informationShow && information &&
                    <>
                        <div className='basket_information-list'>
                            <button onClick={()=>setInformationShow(false)}>Back in catalog</button>
                            <img className='basket_information-img' src={information.img}/>
                            <h3>{information.title}</h3>
                            <p>{information.itemModel}</p>
                            <div className="main_container-basket">
                                <img
                                    onClick={(e) => addBasket(information.id)}
                                    src={BasketCart}
                                    alt="BasketCart"
                                />
                                <p>$ {information.sum}</p>
                            </div>
                        </div>
                    </>
                }
                {price !== 0 && basketShow &&
                    <div className="main_content-basket main_content-basket-mobile">
                        <div className="basket_mobile-close">
                            <h3>My basket</h3>
                            <img onClick={()=> setBasketShow(false)} className='basket_mobile' src={Close} />
                        </div>
                        <div className="basket_information">
                            {listBasket?.map((val, index) =>
                                <div className='basket'>
                                    <img className='basket_img' src={val.img}/>
                                    <div className="basket_flex">
                                        <p>{val.title}</p>
                                        <div className="basket_flex-price">
                                            <button onClick={() => deleteBasketProducts(index)}>-</button>
                                            <p>{val.count}</p>
                                            <button onClick={() => addBasket(val.id)}>+</button>
                                            <p>$ {val.sum * val.count}</p>
                                            <img onClick={()=>deleteBasketProducts(index)} src={Close} alt="Close"/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="basket_price-all">
                            <p>Subtotal: <span>$ {price !== 0 ? price : '0'}</span></p>
                            <p>Tax: <span>$ {Tax}</span></p>
                            <p>Shipping: <span>$ {Shipping}</span></p>
                            <p className='basket_total'>Total: <span>$ {price !== 0 ? price + Tax + Shipping : '0'}</span>
                            </p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Main;