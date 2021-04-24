import { Directive, ViewContainerRef } from '@angular/core';

/* 
 *  ThumbDirective serves as an anchor point to let angular know where to insert components.
 *  ThumbDirective injects ViewContainerRef to gain access to the view container of the element 
 *  that will host the dynamically added component
 * 
 *  The selector name, appThumb will be used to apply the directive to the element
*/

@Directive({
  selector: '[appThumb]'
})
export class ThumbDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
