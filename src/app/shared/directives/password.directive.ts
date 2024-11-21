import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appTogglePassword]",
  exportAs: "togglePassword",
})
export class TogglePasswordDirective {
  isPasswordVisible: boolean = false;

  constructor(private el: ElementRef) {}

  toggleVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.el.nativeElement.type = this.isPasswordVisible ? "text" : "password";
  }

  get isVisibleMethod(): boolean {
    return this.isPasswordVisible;
  }
}
