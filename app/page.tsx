'use client'

import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            {/* Theme Toggle - Fixed Position */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8 animate-fade-in">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>100% Gratuito para começar</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
                        Sua Aprovação{" "}
                        <span className="gradient-text">Começa Aqui</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-200">
                        Análise inteligente de editais, questões geradas por IA e estatísticas completas para turbinar seus estudos
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up animation-delay-400">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 inline-block text-center"
                        >
                            Começar Gratuitamente →
                        </Link>
                        <Link
                            href="/login"
                            className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold text-lg border-2 border-slate-200 dark:border-slate-700 transition-all duration-300 inline-block text-center"
                        >
                            Fazer Login
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">1000+</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Concursos Cadastrados</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">50+</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Bancas Analisadas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">10k+</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Questões Geradas</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Funcionalidades que vão{" "}
                        <span className="gradient-text">transformar seus estudos</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Busca Inteligente</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Encontre rapidamente qualquer concurso e acesse os últimos 5 editais publicados
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
                            <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Estatísticas Completas</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Veja inscrito/vaga, tendências e competitividade de cada concurso
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
                            <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Análise de Bancas</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Entenda como cada banca cobra, quais matérias são prioritárias e o estilo das questões
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.367-1.754-.955-2.385l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Questões com IA 🔥</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Treine com questões geradas especificamente para o estilo da banca do seu concurso
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
                            <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Resumos Inteligentes</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                IA resume os pontos mais importantes de cada edital para economizar seu tempo
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
                            <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Cronogramas Completos</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Acompanhe todas as datas importantes: inscrições, provas, resultados e recursos
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 mt-20">
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-slate-600 dark:text-slate-400">
                        © 2026 App de Concursos. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </main>
    );
}
