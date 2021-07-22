class Core {
    static download(data, filename, type="text/plain") {
        const file = new Blob([data], {type: type});
        if(window.navigator.msSaveOrOpenBlob) { // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else { // Others
            const a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function(){
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 100); 
        }
    }
}

class Counter {
    count = 0;
    element = null;
    constructor(element, count = 0) {
        this.count = count;
        this.element = element;
    }
    add(n = 1) {
        this.count += parseInt(n);
        this.update();
    }
    minus(n = 1) {
        this.count -= parseInt(n);
        this.update();
    }
    logData() {
        return String(new Date())+": "+String(this.count);
    }
    logName() {
        const d = new Date();
        return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}--${d.getTime()}.log`;
    }
    update() {
        this.element.innerText = this.count;
    }
}

const C = new Counter(document.querySelector('#counter'), 0);