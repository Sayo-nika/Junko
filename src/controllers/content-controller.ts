import { Controller, ApiController, HttpGet, HttpPost } from "dinoloop";
import owo = require("owo.js");

@Controller('/posts')
export class ContentController extends ApiController {
    
    @HttpGet('/')
    getContent() {
        return "Nya";
    }

    @HttpPost("/submit")
    postContent() {
        // we'll add this later.   
    }
}
