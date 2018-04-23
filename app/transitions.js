export default function(){
  this.transition(
    this.toValue((to, from) => to.index !== from.index),
    this.use('explode', {
      pickOld: 'h1',
      use: 'toUp'
    }, {
      pickNew: 'h1',
      use: 'toDown'
    }, {
      use: 'crossFade'
    })
  )
  // this.transition(
  //   this.hasClass('sequential-hidden'),
  //
  //   this.toValue(true),
  //   this.use('fade')
  // )
}
