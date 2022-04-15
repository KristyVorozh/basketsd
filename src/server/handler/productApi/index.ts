import {Server} from "miragejs";
import {ListShop} from "../../../type";
import Sneakers574 from '../../../Components/Main/img/574.svg'
import Sneakers920 from '../../../Components/Main/img/920.svg'
import Sneakers373 from '../../../Components/Main/img/373.svg'
import Sneakers670 from '../../../Components/Main/img/670.svg'
import Sneakers5740 from '../../../Components/Main/img/5740.svg'
import SneakersXRacer from '../../../Components/Main/img/x-racer.svg'

export default function(server: Server) {
    server.get("/productApi", (schema, request) => {
        return schema.db.productObject
    })
}

export const productObject: ListShop[] = [
    {
        id: 0,
        title: 'New Balance 574 Vintage Brights',
        sum: 650,
        img: Sneakers574,
        count: 1,
        itemModel: 'Item model number: MT91547'
    },
    {
        id: 1,
        title: 'New Balance Made in UK 920 Chinese New Year',
        sum: 1200,
        img: Sneakers920,
        count: 1,
        itemModel: 'Item model number: MT91547'
    },
    {
        id: 2,
        title: 'New Balance 373 Modern Classics',
        sum: 800,
        img: Sneakers373,
        count: 1,
        itemModel: 'Item model number: MT91547'
    },
    {
        id: 3,
        title: 'New Balance Made in UK 670 Chinese New Year',
        sum: 780,
        img: Sneakers670,
        count: 1,
        itemModel: 'Item model number: MT91547'
    },
    {
        id: 4,
        title: 'New Balance X-Racer Utility',
        sum: 1000,
        img: SneakersXRacer,
        count: 1,
        itemModel: 'Item model number: MT91547'
    },
    {
        id: 5,
        title: 'New Balance 5740 Think Colorfully',
        sum: 940,
        img: Sneakers5740,
        count: 1,
        itemModel: 'Item model number: MT91547'
    },
]

