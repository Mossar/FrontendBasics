# This is the example modal structure which should be attached to specific component HTML.

<button type="button" class="btn btn-default" (click)="modal.show()">Wlacz modal</button>
<app-modal>
  <app-modal-header>
    Tytuł
  </app-modal-header>
  <app-modal-body>
    Treść
  </app-modal-body>
  <app-modal-footer>
    <button type="button" class="btn btn-primary">Zapisz</button>
  </app-modal-footer>
</app-modal>

# The following field should be in component TS file over the constructor. Remember to import ViewChild and ModalComponent.

@ViewChild(ModalComponent)
public readonly modal: ModalComponent;