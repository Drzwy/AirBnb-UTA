import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeDisplayService {

  constructor() { }

  public intToMoneyFormat(mount: number, changeType?: String): String {
    let toCharArray = mount.toString().split("")
    let stack: String[] = []
    let count = 0
    for (let i = toCharArray.length-1; i >= 0; i--) {
      stack.push(toCharArray[i])
      count++
      if (count % 3 == 0) {
        stack.push(",")
      }
    }

    let output = ""
    while (stack.length != 0) {
      output+=stack.pop()
    }


    return "$"+output+" "+changeType
  }
}
