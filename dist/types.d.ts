import { ReactNode } from 'react';
export interface CarouselProps {
    /**
     * Elementos a serem exibidos no carrossel
     */
    children: ReactNode[];
    /**
     * Número de itens visíveis por vez (pode ser fracionário)
     * @default 1
     */
    itemsPerView?: number;
    /**
     * Espaçamento entre os itens em pixels
     * @default 10
     */
    spacing?: number;
    /**
     * Habilitar lazy loading para os itens
     * @default true
     */
    lazyLoad?: boolean;
    /**
     * Número de itens a serem pré-carregados antes e depois dos itens visíveis
     * @default 1
     */
    preloadItems?: number;
    /**
     * Habilitar navegação infinita
     * @default false
     */
    infinite?: boolean;
    /**
     * Habilitar navegação automática
     * @default false
     */
    autoPlay?: boolean;
    /**
     * Intervalo em milissegundos para navegação automática
     * @default 3000
     */
    autoPlayInterval?: number;
    /**
     * Classe CSS personalizada para o container do carrossel
     */
    className?: string;
    /**
     * Mostrar indicadores de navegação
     * @default true
     */
    showIndicators?: boolean;
    /**
     * Mostrar botões de navegação
     * @default true
     */
    showNavigation?: boolean;
    /**
     * Função de callback quando o slide muda
     */
    onSlideChange?: (currentIndex: number) => void;
}
export interface CarouselItemProps {
    /**
     * Conteúdo do item
     */
    children: ReactNode;
    /**
     * Índice do item no carrossel
     */
    index: number;
    /**
     * Se o item está visível atualmente
     */
    isVisible: boolean;
    /**
     * Se o item deve ser pré-carregado
     */
    shouldPreload: boolean;
    /**
     * Largura do item
     */
    width: number | string;
    /**
     * Classe CSS personalizada para o item
     */
    className?: string;
}
