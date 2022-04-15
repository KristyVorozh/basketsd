import { createServer } from "miragejs"
import productApi, {productObject} from '../handler/productApi'

createServer({
    routes() {
        this.namespace = "api";
        productApi(this);
    },
    seeds(server) {
        server.db.loadData({
            productObject
        })
    },
})