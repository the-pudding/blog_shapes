const allJS = d3.select('pre .language-javascript')
const loaded = d3.select(allJS.node().parentNode).attr('data-src-loaded')

let JSLines = null
let setupJS = null 
let scrollJS = null

const innards = []
let full = []


console.log({allJS, loaded})

let allLoaded = false 

function checkLoad(){
    setTimeout(() => {
        JSLines = d3.selectAll('.wrapper-javascript')
        assignBlockNumber();

    }, 1000);
}

function allCollapse(){
    const nestedByParent = d3.nest()
        .key(d => d.parent)
        .entries(full)
     
    nestedByParent.forEach(d => {
        console.log({val: d.values})
        d.values.forEach(e => {
            console.log({e})
            e.between.forEach(f => {
                const middle = JSLines.filter((g, i, n) => {
                    const rowMatch = d3.select(n[i]).attr('data-row') === `${f}`
                    const parentMatch = d3.select(n[i].parentNode).attr('data-block') === `${d.key}`
                    return rowMatch === true && parentMatch === true
                })
                middle.classed('is-hidden', true)
            })
        })
        return d
    })
}

function assignBlockNumber(){
    const jsBlock = d3.selectAll('pre .language-javascript')
    jsBlock._groups[0].forEach((d, i) => {
        console.log({d, i})
        d3.select(d).attr('data-block', i)
    })

    setupCollapse()
}

function handleCollapse(){
    const clicked = d3.select(this)
    const collapsed = clicked.attr('data-collapsed') === 'true'
    const row = clicked.attr('data-row')
    const parent = d3.select(clicked.node().parentNode).attr('data-block')
    const filtered = full.filter(d => d.parent === parent && d.start === +row)
    
    filtered[0].between.forEach(f => {
        const middle = JSLines.filter((g, i, n) => {
            const rowMatch = d3.select(n[i]).attr('data-row') === `${f}`
            const parentMatch = d3.select(n[i].parentNode).attr('data-block') === parent
            return rowMatch === true && parentMatch === true
        })
        middle.classed('is-hidden', !collapsed)
    })

    clicked.attr('data-collapsed', !collapsed)
}

function setupCollapse(){
    const starts = JSLines.filter((d, i, n) => d3.select(n[i]).attr('data-edge') === 'start')
    starts.attr('data-collapsed', true)
    starts.on('click', handleCollapse)
    starts._groups[0].forEach(d => {
        const row = d3.select(d).attr('data-row')
        const parent = d3.select(d.parentNode).attr('data-block')
        innards.push({start: +row, end: null, parent})
        return d
    })

    const ends = JSLines.filter((d, i, n) => d3.select(n[i]).attr('data-edge') === 'end')
    ends._groups[0].forEach((d, i) => {
        const row = d3.select(d).attr('data-row')
        innards[i].end = +row
        return d
    })

    function findMiddle(start, end){
        const range = d3.range(start, end)
        range.shift()
        return range
    }

    full = innards.map(d => ({
        ...d,
        between: findMiddle(d.start, d.end)
    }))

    console.log({full})
    allCollapse()
}

function init(){
    checkLoad()
}

export default init