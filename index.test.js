import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { isPropertySetInCss, isMediaRuleCorrect } from './utility.js';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './index.css'), 'utf8');
const parts = css.split('@media');
const mediaQuery = parts[1];

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it('html-0 CSS dosyası sayfaya eklenmiş', () => {
    const cssLinkTag = dom.window.document.head.querySelector(
      'link[href*="index.css"]'
    );
    expect(cssLinkTag).toBeInTheDocument();
  });

  it("html-1 header bölümü'ne div.header-content menüsü eklenmiş", () => {
    const element = container.querySelector('header div.header-content');
    expect(element).toBeInTheDocument();
  });

  it('html-2 header bölümü içine h1 doğru metin ile eklenmiş', () => {
    const element = container.querySelector('header div.header-content h1');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('ERGİNEER MANGAL');
  });

  it("html-3 header-content'e navigasyon menüsü eklenmiş", () => {
    const element = container.querySelector('.header-content nav');
    expect(element).toBeInTheDocument();
  });

  it("html-4 header-content'in sadece 2 child element'i var: h1 ve nav", () => {
    const element = container.querySelector('.header-content').children;
    expect(element.length).toBe(2);
  });

  it('html-5 navigasyon menüsünün içinde 2 adet div var', () => {
    const element = container.querySelector('nav').children;
    expect(element.length).toBe(2);
  });

  it("html-6 navigasyon menüsünün içindeki div'lerin class'ları sırasıyla nav-items ve social-items", () => {
    const element = container.querySelector('nav').children;
    expect(element[0].classList.contains('nav-items')).toBe(true);
    expect(element[1].classList.contains('social-items')).toBe(true);
  });

  it("html-7 navigasyon bölümü'ndeki nav-items'da 4 adet link eklenmiş ve metinleri doğru", () => {
    const element = container.querySelectorAll('.nav-items a');
    expect(element.length).toBe(4);
    expect(element[0].textContent).toMatch(/Menü/i);
    expect(element[1].textContent).toMatch(/Rezervasyonlar/i);
    expect(element[2].textContent).toMatch(/Teklifler/i);
    expect(element[3].textContent).toMatch(/İletişim/i);
  });

  it("html-8 navigasyon bölümü'ndeki nav-items'da 4 adet link eklenmiş ve metinleri doğru", () => {
    const element = container.querySelectorAll('.social-items i');
    expect(element.length).toBe(3);
    expect(element[0].classList.contains('fa-facebook')).toBe(true);
    expect(element[1].classList.contains('fa-twitter')).toBe(true);
    expect(element[2].classList.contains('fa-instagram')).toBe(true);
  });

  it('html-9 menü bölümünde article.menu-section oluşturulmuş', () => {
    const element = container.querySelector('article.menu-section');
    expect(element).toBeInTheDocument();
  });

  it('html-10 article.menu-section içinde div.menu-container oluşturulmuş', () => {
    const element = container.querySelector(
      'article.menu-section div.menu-container'
    );
    expect(element).toBeInTheDocument();
  });

  it('html-11 div.menu-container içinde h2 doğru metin ile oluşturulmuş', () => {
    const element = container.querySelector('div.menu-container h2');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toMatch(/Yemekler & İçecekler/i);
  });

  it('html-12 div.menu-container içinde div.menu-content oluşturulmuş', () => {
    const element = container.querySelector(
      'div.menu-container div.menu-content'
    );
    expect(element).toBeInTheDocument();
  });

  it('html-13 div.menu-container içinde sadece h2 ve menu-content var', () => {
    const element = container.querySelector('div.menu-container').children;
    const h2 = container.querySelector('div.menu-container h2');
    expect(element[0]).toBe(h2);
    expect(element[1].classList.contains('menu-content')).toBe(true);
  });

  it('html-14 div.menu-content içinde 5 tane div.menu-card var', () => {
    const elements = container.querySelectorAll(
      'div.menu-content div.menu-card'
    );
    expect(elements.length).toBe(5);
  });

  it('html-15 menu-card içindeki başlıklar h3 ve metinleri doğru', () => {
    const elements = container.querySelectorAll('div.menu-card h3');
    expect(elements.length).toBe(5);
    expect(elements[0].textContent).toMatch(/İçecekler/i);
    expect(elements[1].textContent).toMatch(/Aperatifler/i);
    expect(elements[2].textContent).toMatch(/Çorbalar/i);
    expect(elements[3].textContent).toMatch(/Mezeler/i);
    expect(elements[4].textContent).toMatch(/Tatlılar/i);
  });

  it('html-16 içecekler menüsünde 5 tane menu-item var', () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(1) .menu-item'
    );
    expect(elements.length).toBe(5);
  });

  it("html-17 içecekler menüsünde her menu-item'da 2 tane h4 var", () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(1) .menu-item h4'
    );
    expect(elements.length).toBe(10);
  });

  it("html-18 içecekler menüsünde her menu-item'da 1er adet p var", () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(1) .menu-item p'
    );
    expect(elements.length).toBeGreaterThanOrEqual(5);
  });

  it('html-19 içecekler menüsünde ürün ve fiyatlar doğru', () => {
    const elements = container.querySelector(
      'div.menu-card:nth-child(1) .menu-item:nth-child(3)'
    ).children;
    expect(elements[0].textContent).toBe('Kahve');
    expect(elements[1].textContent).toBe('₺2');
    expect(elements[2].textContent).toBe('İsteğe bağlı sütlü ve şekerli');
  });

  it('html-20 Aperatifler menüsünde 5 tane menu-item var', () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(2) .menu-item'
    );
    expect(elements.length).toBe(3);
  });

  it("html-21 Aperatifler menüsünde her menu-item'da 2 tane h4 var", () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(2) .menu-item h4'
    );
    expect(elements.length).toBe(6);
  });

  it("html-22 içecekler menüsünde her menu-item'da toplam 5 adet p var", () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(1) .menu-item p'
    );
    expect(elements.length).toBe(5);
  });

  it('html-23 içecekler menüsünde ürün ve fiyatlar doğru', () => {
    const elements = container.querySelector(
      'div.menu-card:nth-child(2) .menu-item:nth-child(3)'
    ).children;
    expect(elements[0].textContent).toBe('Buffalo Soslu Kanat');
    expect(elements[1].textContent).toBe('₺10');
    expect(elements[2].textContent).toMatch(/Her porsiyonda 5 adet kanat/i);
  });

  it('html-24 Çorbalar ve Salatalar menüsünde 5 tane menu-item var', () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(3) .menu-item'
    );
    expect(elements.length).toBe(3);
  });

  it("html-25 Çorbalar ve Salatalar menüsünde her menu-item'da 2 tane h4 var", () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(3) .menu-item h4'
    );
    expect(elements.length).toBe(6);
  });

  it("html-26 Çorbalar ve Salatalar menüsünde her menu-item'da toplam 5 adet p var", () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(3) .menu-item p'
    );
    expect(elements.length).toBe(5);
  });

  it('html-27 Çorbalar ve Salatalar menüsünde ürün ve fiyatlar doğru', () => {
    const elements = container.querySelector(
      'div.menu-card:nth-child(3) .menu-item:nth-child(3)'
    ).children;
    expect(elements[0].textContent).toBe('Fransız Soğan Çorbası');
    expect(elements[1].textContent).toBe('₺4');
    expect(elements[2].textContent).toMatch(/Kalın bir peynir ve lezzetli/i);
  });

  it('html-28 mezeler menüsünde 5 tane menu-item var', () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(4) .menu-item'
    );
    expect(elements.length).toBe(3);
  });

  it("html-29 mezeler menüsünde her menu-item'da 2 tane h4 var", () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(4) .menu-item h4'
    );
    expect(elements.length).toBe(6);
  });

  it("html-30 mezeler menüsünde her menu-item'da toplam 4 adet p var", () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(4) .menu-item p'
    );
    expect(elements.length).toBe(4);
  });

  it('html-31 mezeler menüsünde ürün ve fiyatlar doğru', () => {
    const elements = container.querySelector(
      'div.menu-card:nth-child(4) .menu-item:nth-child(3)'
    ).children;
    expect(elements[0].textContent).toBe('Büyük Hamburger');
    expect(elements[1].textContent).toBe('₺14');
    expect(elements[2].textContent).toMatch(
      /Patates kızartması ve salata ile/i
    );
  });

  it('html-32 tatlılar menüsünde 5 tane menu-item var', () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(5) .menu-item'
    );
    expect(elements.length).toBe(3);
  });

  it("html-33 tatlılar menüsünde her menu-item'da 2 tane h4 var", () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(5) .menu-item h4'
    );
    expect(elements.length).toBe(6);
  });

  it("html-34 tatlılar menüsünde her menu-item'da toplam 4 adet p var", () => {
    const elements = container.querySelectorAll(
      'div.menu-card:nth-child(5) .menu-item p'
    );
    expect(elements.length).toBe(5);
  });

  it('html-35 tatlılar menüsünde ürün ve fiyatlar doğru', () => {
    const elements = container.querySelector(
      'div.menu-card:nth-child(5) .menu-item:nth-child(3)'
    ).children;
    expect(elements[0].textContent).toBe('Kurabiye ve Dondurma');
    expect(elements[1].textContent).toBe('₺6');
    expect(elements[2].textContent).toMatch(/2 kurabiye ve 1 top dondurma/i);
  });

  it("css-1 nav içindeki i'ler için font-size ana font'un 3 katı ayarlanmış.", () => {
    expect(isPropertySetInCss(css, 'navi', 'font-size', '3rem')).toBe(true);
  });

  it('css-2 nav-items için istenenler flex özellikleri ile ayarlanmış.', () => {
    expect(isPropertySetInCss(css, '.nav-items', 'display', 'flex')).toBe(true);
    expect(
      isPropertySetInCss(css, '.nav-items', 'justify-content', 'center')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.nav-items', 'gap', '2rem')).toBe(true);
  });

  it('css-3 menu-content için istenenler flex özellikleri ve diğer özellik ayarlanmış.', () => {
    expect(isPropertySetInCss(css, '.menu-content', 'display', 'flex')).toBe(
      true
    );
    expect(
      isPropertySetInCss(css, '.menu-content', 'justify-content', 'center')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.menu-content', 'flex-wrap', 'wrap')).toBe(
      true
    );
    expect(isPropertySetInCss(css, '.menu-content', 'gap', '6rem')).toBe(true);
    expect(isPropertySetInCss(css, '.menu-content', 'text-align', 'left')).toBe(
      true
    );
  });

  it('css-4 menu-card için istenenler flex özellikleri ve diğer özellik ayarlanmış.', () => {
    expect(isPropertySetInCss(css, '.menu-card', 'display', 'flex')).toBe(true);
    expect(
      isPropertySetInCss(css, '.menu-card', 'flex-direction', 'column')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.menu-card', 'width', '35%')).toBe(true);
  });

  it('css-5 menu-item için istenenler flex özellikleri ve diğer özellik ayarlanmış.', () => {
    expect(isPropertySetInCss(css, '.menu-item', 'display', 'flex')).toBe(true);
    expect(
      isPropertySetInCss(css, '.menu-item', 'justify-content', 'space-between')
    ).toBe(true);
    expect(isPropertySetInCss(css, '.menu-item', 'flex-wrap', 'wrap')).toBe(
      true
    );
    expect(isPropertySetInCss(css, '.menu-item', 'margin', '1.5rem 0')).toBe(
      true
    );
  });

  it('css-6 media query maks genişlik 500px için ayarlanmış', () => {
    expect(isMediaRuleCorrect(mediaQuery, 'max-width', '500px')).toBe(true);
  });

  it('css-7 responsive için body tag ayarları yapılmış', () => {
    expect(isPropertySetInCss(mediaQuery, 'body', 'min-width', '350px')).toBe(
      true
    );
    expect(isPropertySetInCss(mediaQuery, 'body', 'text-align', 'center')).toBe(
      true
    );
    expect(isPropertySetInCss(mediaQuery, 'body', 'color', 'black')).toBe(true);
  });

  it("css-8 responsive için h2 tag'e border-bottom ayarlar eklenmiş", () => {
    expect(
      isPropertySetInCss(mediaQuery, 'h2', 'border-bottom', '20px solid black')
    ).toBe(true);
  });

  it("css-9 responsive için h3 tag'e border ayarlar eklenmiş", () => {
    expect(
      isPropertySetInCss(mediaQuery, 'h3', 'border', '10px solid black')
    ).toBe(true);
  });

  it('css-10 responsive için .nav-items ayarları yapılmış', () => {
    expect(
      isPropertySetInCss(mediaQuery, '.nav-items', 'flex-direction', 'column')
    ).toBe(true);
    expect(
      isPropertySetInCss(mediaQuery, '.nav-items', 'align-content', 'center')
    ).toBe(true);
    expect(isPropertySetInCss(mediaQuery, '.nav-items', 'gap', '1rem')).toBe(
      true
    );
    expect(
      isPropertySetInCss(mediaQuery, '.nav-items', 'margin', '2rem 0')
    ).toBe(true);
  });

  it("css-11 responsive için .menu-section'a background eklenmiş", () => {
    expect(
      isPropertySetInCss(
        mediaQuery,
        '.menu-section',
        'background',
        'rgb(225, 239, 230)'
      )
    ).toBe(true);
  });

  it("css-12 responsive için menu-container'da background yok edilmiş", () => {
    expect(
      isPropertySetInCss(mediaQuery, '.menu-container', 'background', 'none')
    ).toBe(true);
  });

  it("css-13 responsive için .menu-item'ın last-child olduğu durumda border unset yapılmış", () => {
    expect(
      isPropertySetInCss(mediaQuery, '.menu-item:last-child', 'border', 'unset')
    ).toBe(true);
  });

  it('css-14 responsive için .menu-card ayaları eklenmiş', () => {
    expect(isPropertySetInCss(mediaQuery, '.menu-card', 'margin', '10%')).toBe(
      true
    );
    expect(isPropertySetInCss(mediaQuery, '.menu-card', 'width', '90%')).toBe(
      true
    );
  });
});
