class FlipObject {
    constructor(elem){
        this.first;
        this.last;
        this.inv_top;
        this.inv_left;
        this.inv_height;
        this.inv_width;
        this.scale_h;
        this.scale_w;
        this.animation = [];
        this.elem = elem;
    }

    getFirstState(){
        this.first = this.elem.getBoundingClientRect();
    }
    
    getLastState(){
        this.last = this.elem.getBoundingClientRect();
    }

    invert(){
        this.inv_top = this.first.top - this.last.top;
        this.inv_left = this.first.left - this.last.left;
        this.inv_height = this.first.height - this.last.height;
        this.inv_width = this.first.width - this.last.width;
        this.scale_h = this.first.height / this.last.height;
        this.scale_w = this.first.width / this.last.width;
    }
}