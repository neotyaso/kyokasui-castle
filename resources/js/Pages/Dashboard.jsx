import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    管理メニュー
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <Link
                                        href={route('admin.contacts')}
                                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-semibold text-gray-900">
                                                    お問い合わせ管理
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    お問い合わせの確認・管理
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link
                                        href={route('admin.news.index')}
                                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-semibold text-gray-900">
                                                    お知らせ管理
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    お知らせの確認・管理
                                                </p>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* 今後追加する管理機能用のプレースホルダー */}
                                    <div className="block p-6 bg-gray-50 border border-gray-200 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-semibold text-gray-400">
                                                    その他の機能
                                                </h4>
                                                <p className="text-sm text-gray-400">
                                                    今後追加予定
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <p className="text-sm text-gray-600">
                                    ログイン中です！管理機能をご利用ください。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
