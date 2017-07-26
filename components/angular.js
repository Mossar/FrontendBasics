/* Angular 4 example of component */
@Component({
  selector: 'search-bar',
  template: `
      <div class="search-bar">
          <input type="text" />
      </div>
  `
})
export class SearchBar {
}

/* Usage */
<search-bar></search-bar>
