import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  // it('should be 4', () => {
  //   // Arrange
  //   const num1 = 1;
  //   const num2 = 3;

  //   // Act
  //   const result = num1 + num2;

  //   // Assert
  //   expect(result).toBe(4);
  // })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    const compiled = fixture.nativeElement as HTMLElement;

    // console.log( compiled.innerHTML );

    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {
    //Arrange
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;

    // Act
    const routerOutlet = compiled.querySelector('router-outlet');

    //Assert
    expect(routerOutlet).toBeTruthy();

  });
  
  it('should render router-outlet with css classes', () => {
    //Arrange
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;

    // Act
    const divElement = compiled.querySelector('div');
    const mostHaveClasses = 'min-w-screen min-h-screen bg-slate-700 flex items-center justify-center px-5 py-5'.split(' ');

    //Assert
    // expect(divElement?.classList.value).toBe(mostHaveClasses);
    divElement?.classList.forEach( (className) => {
      expect(mostHaveClasses).toContain(className);
    });

  });

  it('should render buy me a beer link', () => {
    //TODO:
    //Arrange
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;

    // Act
    const linkElement = compiled.querySelector('a');

    //Assert
    expect(linkElement).toBeTruthy();
    // console.log( 'title:', linkElement?.getAttribute('title') );
    expect(linkElement?.getAttribute('title')).toBe('Buy me a beer');
    // console.log( 'href:', linkElement?.getAttribute('href') );
    expect(linkElement?.getAttribute('href')).toBe('https://www.buymeacoffee.com/scottwindon');
    // console.log( 'target:', linkElement?.getAttribute('target') );
    expect(linkElement?.getAttribute('target')).toBe('_blank');


  });



  // it('should render title', async () => {
  //   const fixture = TestBed.createComponent(App);
  //   await fixture.whenStable();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zoneless-calculator');
  // });
});
