// Object Traversal in JavaScript
// We will traverse this horse object and its method
const horse: any = {
   color: "Black",
   name: "Chetan",
   behaviour: {
      actionTypes: {
         moveMethod: ["Twist", "Jump", "Run"],
         twistAction() {
            console.log('Moved now')
         },
         jumpAction() {
            console.log('Jumped now')
         }
      },
      mood: "angry",
      ears: "closed"
   }
}
const traverseObj = (horse: any) => {
   for (let prop in horse) {
      if (typeof horse[prop] === 'object') {
         traverseObj(horse[prop])
      } else if (typeof horse[prop] === 'function') {
         horse[prop]()
      } else {
         console.log(horse[prop])
      }
   }
}
traverseObj(horse)