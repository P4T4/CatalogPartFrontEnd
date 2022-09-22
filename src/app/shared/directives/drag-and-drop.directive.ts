import { Directive, HostListener, EventEmitter, Output, HostBinding, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Directive({
    selector: '[dragAndDropDirective]',
})
export class DragAndDropDirective {
    @Output('files') files: EventEmitter<DragEvent> = new EventEmitter();
    @HostBinding('style.background') public background = '#c3c3c3';
    constructor(private sanitizer: DomSanitizer) { }
    @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#B5B5B5';
    }
    @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
    }
    @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#c3c3c3';
        let files: any[] = [];
        for (let i = 0; i < evt.dataTransfer.files.length; i++) {
            const file = evt.dataTransfer.files[i];
            const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
            files.push({
                file,
                url
            });
        }
        if (files.length > 0) {
            this.files.emit(evt);
        }
    }
}   