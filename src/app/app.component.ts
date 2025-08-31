import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'church-web';
  isPinned: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    // Load pinned state from localStorage
    const savedPinState = localStorage.getItem('sidenavPinned');
    this.isPinned = savedPinState === 'true'; // Default to false (unpinned) if not set
  }

  togglePin(): void {
    this.isPinned = !this.isPinned;
    localStorage.setItem('sidenavPinned', this.isPinned.toString());
  }

  toggleDrawer(drawer: any): void {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      drawer.toggle();
    } else if (!this.isPinned) {
      drawer.toggle();
    }
  }

  getSidenavMode(): string {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      return 'over';
    }
    return this.isPinned ? 'side' : 'over';
  }

  getSidenavOpened(): boolean {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      return false;
    }
    return this.isPinned;
  }

}
