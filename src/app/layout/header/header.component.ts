import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('aside') sidebar!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    document.getElementById('close-btn')?.addEventListener('click', () => {
      console.log(this.sidebar.nativeElement);
        this.renderer.setStyle(this.sidebar.nativeElement,"display","none");
  })

  document.getElementById('menu-btn')?.addEventListener('click', () => {
    console.log(this.sidebar.nativeElement);
    this.renderer.setStyle(this.sidebar.nativeElement, 'display', 'flex');
  });

}
}
