const $siteList =$('.siteList')
const $lastLi = $siteList.find('li.last')
const x=localStorage.getItem('x')
const xObject = JSON.parse(x)
const hasMap = xObject || [
    { logo: 'A', logeType: 'text', url:'https://www.acfun.cn'},
    { logo: 'images/bilibili.jpg', logeType: 'img',url: 'http://www.bilibili.com'}
]

const simplifyUrl = (url) =>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')  //删除/开头的内容
}

const render = () =>{
    $siteList.find('li:not(.last)').remove()
    hasMap.forEach((node,index)=>{
        const $li = $(`<li>
             <div class="site">
                <div class="logo">${simplifyUrl(node.url)[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">x</div>
            </div>   
    </li>`).insertBefore($lastLi)
    $li.on('click',()=>{
        window.open(node.url)
        })
    $li.on('click','.close',(e)=>{
            e.stopPropagation() //阻止冒泡
            hasMap.splice(index,1)
            render();
        })
    })
}

render();


$('.addButton').on('click',()=>{
    let url = window.prompt('请输入需要添加的网址')
    if(url.indexOf('https')!=0){
        url = 'https://' + url
    }
   hasMap.push({ logo: simplifyUrl(url)[0].toUpperCase(),
                logeType: 'text',
                url: url});
   render();       
});

window.onbeforeunload = () =>{
    const string = JSON.stringify(hasMap)
    localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
    const key = e.key
    for(let i=0;i<hasMap.length;i++){
        if(hasMap[i].logo.toLowerCase()===key){
            window.open(hasMap[i].url)
        }
    }
})

