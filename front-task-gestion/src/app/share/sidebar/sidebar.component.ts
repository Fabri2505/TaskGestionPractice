import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              separator: true
          },
          {
              label: 'Documents',
              items: [
                  {
                      label: 'New',
                      icon: 'pi pi-plus',
                      shortcut: '⌘+N'
                  },
                  {
                      label: 'Search',
                      icon: 'pi pi-search',
                      shortcut: '⌘+S'
                  }
              ]
          },
          {
              label: 'Profile',
              items: [
                  {
                      label: 'Settings',
                      icon: 'pi pi-cog',
                      shortcut: '⌘+O'
                  },
                  {
                      label: 'Messages',
                      icon: 'pi pi-inbox',
                      badge: '2'
                  },
                  {
                      label: 'Logout',
                      icon: 'pi pi-sign-out',
                      shortcut: '⌘+Q'
                  }
              ]
          },
          {
              separator: true
          }
      ];
  }
}
