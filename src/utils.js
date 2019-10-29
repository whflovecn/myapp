const utils = class {
    Omit(text, length, fontSize=document.body.style.fontSize,fontFamily=document.body.style.fontFamily) {
        let txtDiv = document.getElementById('labelText')
        txtDiv.style.fontSize = fontSize
        txtDiv.style.fontFamily = fontFamily
        txtDiv.innerText = text
        let width = txtDiv.clientWidth
        let rt = text
        while (width>length){
            rt = rt.substring(0,rt.length-1)
            txtDiv.innerText = rt
            width = txtDiv.clientWidth
        }
        if (rt.length==text.length){
            return text
        }else{
            return rt+'...'
        }
    }
}

export default utils