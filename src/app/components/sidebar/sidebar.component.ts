import {Component, OnInit} from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    // {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    // {path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
    // {path: '/table-list', title: 'Table List', icon: 'content_paste', class: ''},
    // {path: '/typography', title: 'Typography', icon: 'library_books', class: ''},
    // {path: '/icons', title: 'Icons', icon: 'bubble_chart', class: ''},
    // {path: '/maps', title: 'Maps', icon: 'location_on', class: ''},
    // {path: '/notifications', title: 'Notifications', icon: 'notifications', class: ''},
    {path: '/manage-student', title: 'Manage Student', icon: 'person', class: ''},
    {path: '/manage-lecturer', title: 'Manage Lecturer', icon: 'person', class: ''},
    {path: '/grading', title: 'Grading', icon: 'grade', class: ''},
    {path: '/transcript', title: 'Transcript', icon: 'book', class: ''},
    {path: '/manage-request', title: 'Request', icon: 'archive', class: ''},
    // {path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro'},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}