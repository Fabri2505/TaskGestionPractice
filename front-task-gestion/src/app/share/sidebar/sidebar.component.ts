import { Component, OnInit } from '@angular/core';
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
export class SidebarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              separator: true
          },
          {
              label: 'Users',
              items: [
                  {
                      label: 'Perfil',
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
              label: 'Task',
              items: [
                  {
                      label: 'Historial',
                      icon: 'pi pi-cog',
                      shortcut: '⌘+O'
                  },
                  {
                      label: 'Gestion',
                      icon: 'pi pi-inbox',
                      badge: '2'
                  }
              ]
          },
          {
              separator: false
          }
      ];
  }
}
