import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Contacts() {
    const { contacts } = usePage().props;
    const [selectedContact, setSelectedContact] = useState(null);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        お問い合わせ管理
                    </h2>
                    <Link
                        href={route('dashboard')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
                    >
                        ダッシュボードに戻る
                    </Link>
                </div>
            }
        >
            <Head title="お問い合わせ管理" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {!selectedContact ? (
                        // 一覧表示
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        お問い合わせ一覧 ({contacts.length}件)
                                    </h3>
                                </div>

                                {contacts.length === 0 ? (
                                    <div className="text-center py-12">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">お問い合わせがありません</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            新しいお問い合わせが来ると、ここに表示されます。
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        受信日時
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        お名前
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        メールアドレス
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        お問い合わせ内容
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        操作
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {contacts.map((contact) => (
                                                    <tr key={contact.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {formatDate(contact.created_at)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {contact.name}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                {contact.email}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-gray-900 max-w-md">
                                                                {contact.message.length > 100
                                                                    ? `${contact.message.substring(0, 100)}...`
                                                                    : contact.message
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button
                                                                onClick={() => setSelectedContact(contact)}
                                                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded-md transition-colors"
                                                            >
                                                                詳細を見る
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        // 詳細表示
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        お問い合わせ詳細
                                    </h3>
                                    <button
                                        onClick={() => setSelectedContact(null)}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
                                    >
                                        一覧に戻る
                                    </button>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                受信日時
                                            </label>
                                            <p className="text-sm text-gray-900 bg-white p-2 rounded border">
                                                {formatDate(selectedContact.created_at)}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                ID
                                            </label>
                                            <p className="text-sm text-gray-900 bg-white p-2 rounded border">
                                                #{selectedContact.id}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                お名前
                                            </label>
                                            <p className="text-sm text-gray-900 bg-white p-2 rounded border">
                                                {selectedContact.name}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                メールアドレス
                                            </label>
                                            <p className="text-sm text-gray-900 bg-white p-2 rounded border">
                                                <a
                                                    href={`mailto:${selectedContact.email}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {selectedContact.email}
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            お問い合わせ内容
                                        </label>
                                        <div className="bg-white p-4 rounded border min-h-[200px]">
                                            <pre className="whitespace-pre-wrap text-sm text-gray-900 font-sans">
                                                {selectedContact.message}
                                            </pre>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3 pt-4">
                                        <a
                                            href={`mailto:${selectedContact.email}?subject=Re: お問い合わせについて`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                                        >
                                            メールで返信
                                        </a>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(selectedContact.email);
                                                alert('メールアドレスをコピーしました');
                                            }}
                                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
                                        >
                                            メールアドレスをコピー
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
