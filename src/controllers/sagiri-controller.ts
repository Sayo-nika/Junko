import {Handler} from 'sagiri';
import { Controller, ApiController, HttpPost, SendsResponse } from 'dinoloop';

const sauceClient: Handler = new Handler(process.env.FRANCHOUCHOU_SAUCENAO_KEY, {numRes: 2, getRating: true});

@Controller("/sagiri")
export class SagiriController extends ApiController {

    @SendsResponse()
    @HttpPost("/get_source")
    getSource() {
        const req = this.request;
        const data = req.body.imageData.replace(/^data:image\/png;base64,/, "");

        // send the data to SauceNAO
        sauceClient.getSource(data).then(s => {
            return s;
        }).catch(e => {
            return e;
        })
    }
}
