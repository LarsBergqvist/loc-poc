import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppBarComponent } from './app-bar.component';
import { ToolbarModule } from 'primeng/toolbar';

describe('AppBarComponent', () => {
    let component: AppBarComponent;
    let fixture: ComponentFixture<AppBarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                ToolbarModule
            ],
            declarations: [AppBarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
