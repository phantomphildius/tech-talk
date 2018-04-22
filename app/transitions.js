export default function(){
  this.transition(
    this.toValue((to, from) => to.index !== from.index),
    this.use('explode', {
      pickOld: 'h4',
      use: 'toUp'
    }, {
      pickNew: 'h4',
      use: 'toDown'
    }, {
      use: 'crossFade'
    })
  )
}
