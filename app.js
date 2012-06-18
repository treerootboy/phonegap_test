Ext.application({

    name: '8891',

    launch: function() {
        Ext.create('Ext.tab.Panel', {
            fullscreen: true,
            tabBarPosition: 'bottom',

            items: [
                {
                    title: 'Welcome',
                    iconCls: 'home',
                    cls: 'home',

                    html: [
                        '<img src="http://img.8891.com.tw/common/logo.gif"/>',
                        '<h1>Welcome to 8891</h1>',
                        '<p>This is a 8891 app test!</p>',
                        '<p>Welcome and enjoey it!</p>'
                    ].join("")
                },
                {
                    xtype: 'nestedlist',
                    title: 'Blog Feed',
                    iconCls: 'star',
                    displayField: 'title',

                    store: {
                        type: 'tree',

                        fields: [
                            'title', 'link', 'author', 'contentSnippet', 'content',
                            {name: 'leaf', defaultValue: true}
                        ],

                        root: {
                            leaf: false
                        },

                        proxy: {
                            type: 'jsonp',
                            url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://blog.treerootboy.info/?feed=rss2',
                            reader: {
                                type: 'json',
                                rootProperty: 'responseData.feed.entries'
                            }
                        }
                    },

                    detailCard: {
                        xtype: 'panel',
                        scrollable: true,
                        styleHtmlContent: true
                    },

                    listeners: {
                        itemtap: function(nestedList, list, index, element, post) {
                            this.getDetailCard().setHtml(post.get('content'));
                        }
                    }
                },
                {
                    title: 'Contact',
                    iconCls: 'user',
                    xtype: 'formpanel',
                    url: 'contact.php',
                    layout: 'vbox',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Contact Us',
                            instructions: '(email address is optional)',
                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Name'
                                },
                                {
                                    xtype: 'emailfield',
                                    label: 'Email'
                                },
                                {
                                    xtype: 'textareafield',
                                    label: 'Message'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Send',
                            ui: 'confirm',
                            handler: function(){
                                this.up('formpanel').submit();
                            }
                        }
                    ]
                }
            ]
        });
    }
});
