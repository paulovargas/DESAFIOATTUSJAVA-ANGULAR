import { NgbdSortableHeader } from './sortable.directive';

describe('NgbdSortableHeader', () => {
  it('should rotate direction and emit sort event', () => {
    const directive = new NgbdSortableHeader();
    const events: unknown[] = [];
    directive.sortable = 'name';
    directive.sort.subscribe((event) => events.push(event));

    directive.rotate();

    expect(directive.direction).toBe('asc');
    expect(events).toEqual([{ column: 'name', direction: 'asc' }]);
  });
});

