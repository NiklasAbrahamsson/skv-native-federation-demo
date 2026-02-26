import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  /**
   * Route parameter bound via Angular's withComponentInputBinding().
   * The route is defined as `details/:id`, so Angular automatically
   * injects the `id` param into this input.
   */
  readonly id = input.required<string>();
}
