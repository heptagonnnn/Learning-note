# Json Schema Core中文翻译
[toc]

## JSON Schema: A Meadia Type for Describing JSON Documents

JSON模式：一种描述JSON文档的媒体类型

### draft-handrews-json-01

草稿



## Abstract

JSON Schema defines the media type "application/schema+json", a JSON-based format for describing the structure of JSON data.JSON Schema asserts what a JSON document must look like, ways to extract information from it, and how to interact with it. The "application/schema-instance+json" media type provides addtional feature-rich integration with "application/schema+json" beyond what can be offered for "application/json" documents.

## 摘要
JSON Schema定义了"application/schema+json"媒体类型， 这种类型本身基于json格式，用于描述JSON数据的结构。JSON Schema断言了JSON文档看起来必须是什么样子，如何从中提取出信息，如何与它交互。"appication/schema-instan+json"媒体类型提供了额外的功能丰富的"application/schema+json"集合，这是"application/json"文档不能提供的。


## Note to Readers
The issues list for this draft can be found at <https://github.com/json-schema-org/json-schema-spec/issues>.

For additional information, see <http://json-schema.org/>.

To provide feedback, use this issue tracker, the communication methods listed on the homepage, or email the document editors.

## 读者须知
草案的issue列表可以在<https://github.com/json-schema-org/json-schema-spec/issues>中找到。

更多信息，可以参考<http://json-schema.org/>。

如有反馈，可以使用issue，主页上的社区方法，或给文档编辑发邮件。

## Status of This Demo
This Internet-Draft is submitted in full conformance with the provisions of BCP 78 and BCP 79.

Internet-Drafts are working documents of the Internet Engineering Task Force(IEFT). Note that other groups may also distribute working documents as Internet-Drafts. The list of current Internet-Drafts is at http://datatracker.ietf.org/drafts/current/.

Internet-Drafts will expire on September 20, 2018.

## 当前Demo的状态

这个互联网草案，已经提呈进行BCP78和BCP79中规定的完整一致性检验。


互联网草案目前由IEFT负责。其他组织也会负责贡献草稿的文档工作，当前互联网草案的列表在http://datatracker.ietf.org/drafts/current/。

互联网草案将在2018年9月20号结束。


## Copyright Notice

Copyright(c)2018 IETF Trust and the persons identified as the document authors. All rights reserved.

This documents is subject to BCP 78 and the IETF Trsut's Legal Provisions Relating to IETF Documents (http://trustee.ietf.org/license-info) in effect on the date of publication of thi s document. Please review these documents carefully, as they describe your rights and restrictions with respect to this document. Code Components extracted from this docuemnt must include Simplified BSD warranty as described in the Simplified BSD License.


## 版权注意

版权所有(c)2018 IETF信托及被认定为文件作者的人士。保留所有权利。

本文件受BCP 78和IETF Trsut有关IETF文件(http://trustee.ietf.org/license-info)的法律规定的约束，该等法律规定自本文件发布之日起生效。请仔细审阅这些文件，因为它们描述了您对本文件的权利和限制。从这个文档中提取的代码组件必须包含简化BSD许可，就像在简化BSD许可中描述的那样。

## Table of Contents--目录



## 1. Introduction

JSON Schema is a JSON media type for defining the structure of JSON data. JSON Schema is intended to define validation, documentation, hyperlink navigation, and interaction control of JSON data.

This specification defines JSON Schema core terminology and mechanisms, including pointing to another JSON Schema by reference, dereferencing a JSON Schema reference, and specifying the vocabulary being used.

Other specifications define the vocabularies that perform assertions about validation, linking, annotation, navigation, and interacion.

## 1. 简介
JSON Schema 是一种定义JSON数据结构的JSON媒体类型。JSON Scheme用于定义校验，文档，超链接导航和JSON数据交互控制。

本规范定义了JSON Schema核心术语和机制，包括通过引用指向另一个JSON Schema，解析JSON Schema引用，并且定义一些用词。
其他规范定义了关于执行断言校验、链接、注解、导航和互动的词汇。

## 2.Conventions and Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY" and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

The terms "JSON", "JSON text", "JSON value", "member", "element", "object", "array", "number", "string", "boolean", "true", "false", and "null" in this document are to be interpreted as defined in RFC 7159.

## 2.约定与术语

本文中提及关键字“必须”， “必须不”，“必备”， “要”， “不要”，“应该”，“不应该”，“推荐”， “可以”，“可选”，在RFC 2119中均有说明加以解释。


本文中提及的术语"JSON", “JSON文本”，“JSON值”，“成员”，“元素”，“对象”，“数组”，“数字”，“字符串”，“布尔值”，“true”，“false”，“null”在RFC 7159中均有解释说明


## 3.Overview

This document proposes a new media type "application/schema+json" to identify a JSON Schema for describing JSON data. It also proposes a further optional media type, "application/schema-instance+json", to provide additional integration features. JSON Schemas are themselves JSON documents. This, and related specifications, define keywords allowing authors to describe JSON data in several ways.



## 3.简介

本文档提出了一种新的媒体类型---"application/schema+json"，它用来定义用于描述JSON数据的JSON Schema。它同样提议了一种更深入的可选媒体类型---"application/schema-instance+json"，用于提供额外的集成参数。这中媒体类型，与相关联的规范，用几个方面，共同定义了允许作者描述JSON数据的关键字。




### 3.1 Validation

JSON Schema describes the structure of a JSON document(for instance, required properties and length limitations). Applications can use this information to validate instances(check that constraints are met), or inform interfaces to collect user input such that the constraints are satisfied

Validation behaviour and keywords are specified in a seperate document[json-schema-validation].

### 3.1 合法性校验
JSON Schema描述了JSON文档的结构（例如，必填属性和长度限制）。应用可以使用这个信息去校验实例（检查约束是否被匹配），或通知界面去手机符合约束的用户输入。

合法性校验行为和关键在在单独的文档规范中有介绍

### 3.2 annotation

JSON Schema can annotate an instance with information, whenever the instance validates against the schema object containing the annotation, and all of its parent schema object.

Detailed annotation behavior, along with a small set of basic annotation keywords are defined int the validation specification[json-schema-validation]


### 3.2 注解

当实例对含有注解的schema对象和他们的父对象进行校验时，JSON Schema可以用一些信息对实例进行注解。

详细的注解行为，以及一小组基本注解关键字被定义在校验规范中


### 3.3 Hypermedia and Linking

JSON Hyper-Schema describes the hypertext structure of a JSON document. This includes link relations from the instance to other resources, interpretation of instances as multimedia data, and submission data required to use an API.

Hyper-Schema behaviour and keywords are specified in a separate document[json-hyper-schema].


JSON Hyper-Schema 描述了JSON文档的超文本结构。它包括从实例到其他资源的链接关系，多媒体数据实例的解释，和API中必须提交的数据。

Hyper-Schema 行为和关键字在单独的文档中有规定。


## 4. definitions

## 4. 定义

### 4.1 JSON Document

A JSON document is an information resource(series of octets) described by the application/json media type.

In JSON Schema, the terms "JSON document", "JSON text", and "JSON value" are interchangeable because of the data model it defines.

JSON Schema is only defined over JSON documents. However, any document or memory structrue that can be parsed into or processed according to the JSON Schema data model can be interpreted against a JSON Schema, including media types like CBOR[RFC7049].


### 4.1 JSON文档

JSON文档是一种由application/json媒体类型描述的信息源(八进制序列)。

在JSON Schema中，“JSON文档”， “JSON文本”和“JSON值”是可以互换的，因为他们定义了相同的数据模型。

JSON Schema虽然只是定义了JSON文档。但是，任何可以根据JSON模式数据模型解析或处理的文档或内存结构都可以根据JSON模式进行解释，也包括了CBOR中声明的媒体类型




### 4.2 Instance

A JSON document to which a schema is applied is known as an "instance".


### 4.2 实例
应用JSON Schema的JSON文档成为“实例”。


#### 4.2.1 Instance Data Model

JSON Schema interprets documents according to a data model. A JSON value interpreted according to this data model is called an "instance".

An instance has one of six primitive types, and a range of possible values depending on the type:

null:
    A JSON "null" production

boolean: 
    A "true" or "false" value, from the JSON "true" or "false" productions.

object:
    An unordered set of properties mapping a string to an instance, from the JSON "object" production

array:
    An ordered list of instances, from the JSON "array" production

number:
    An arbitrary-precision, base-10 decimal number value, from the JSON "number" production

string:
    A string of Unicode code points, from the JSON "string" production

Whitespace and formatting concerns, including different lexical representations of numbers that are equal within the data model, are thus outside the scope of JSON Schema. JSON Schema vocabularies [vocabulary] that wish to work with such differences in lexical representations SHOULD define keywords to precisely interpret formmated strings within the data model rather than relying on having the original JSON representation Unicode characters available.

Since an object cannot have two properties with the same key, behavio for a JSON document that tries to define two properties (the "member" production) with the same key (the "string" production) in a single object is undefined.

Note that JSON Schema vocabularies are free to define their own extended type system. This should not be confused with the core data model types defined here. As an example, "integer" is a reasonable type for a vocabulary to define as a value for a keyword, but the data model makes no distinction between integers and other numbers.


#### 4.2.1 数据模型实例

JSON Schema 根据数据模型解释文档。 一个根据数据模型解释的JSON值称为“实例”。

实例有6种原始类型，和预期匹配的值的范围：

null：
    包括了JSON中的“null”值

boolean（布尔）：
    “true”或“false”值，来自JSON的“true”或“false”结果

object：
    将字符串映射到实例的无序属性集，来自JSON“object”结果

array：
    实例的有序列表，来自JSON“array”结果

number：
    JSON“number”结果中的任意精度、以10为基数的十进制数值

string：
    一个Unicode编码点字符串，来自JSON的“字符串”结果

因此， 空格和格式化问题（包括数据模型中相等数字的不同词汇表达问题），已经超出了JSON Schema的范畴。JSON模式词汇表[词汇表]希望处理词汇表示方面的这些差异，应该定义关键字来精确地解释数据模型中的格式化字符串，而不是依赖于原始JSON表示Unicode字符。

由于对象不能有两个具有相同键的属性，因此JSON文档试图在单个对象中定义具有相同键的两个属性(“成员”生成)(“字符串”生成)的行为是未定义的。


注意JSON模式词汇表可以自由定义自己的扩展类型系统。这不应该与这里定义的核心数据模型类型混淆。例如，“integer”是词汇表定义为关键字值的合理类型，但是数据模型不区分整数和其他数字。


#### 4.2.2 Instance Media Types

JSON Schema is designed to fully work with "application/json" documents, as well as media types using the "+json" structured syntax suffix.

Some functionality that is useful for working with schemas is defined by each media type, namely media type parameters and URI fragment identifier syntax and semantics. These features are useful in content negotiation and in calculating URIs for specific locations within an instance, respectively.

This specification defines the "application/schema-instance+json" media type in order to allow instance authors to take full advantage of parameters and fragment identifiers for these purposes.


#### 4.2.2 媒体类型实例

JSON Schema 被设计成完全处理“application/json”文档以及“+json”结构语法后缀的媒体类型

对于处理模式有用的一些功能是由每种媒体类型定义的，即媒体类型参数和URI片段标识符语法和语义。这些特性分别在内容协商和计算实例中特定位置的uri时非常有用。


该规范定义了“application/schema-instance+json”媒体类型，以便实例作者能够充分利用这些参数和片段标识符。


#### 4.2.3 Instance Equality

Two JSON instances are said to be equal if and only if they are of the same type and have the same value according to the data model. Specifically, this means:

both are null; or
both are true; or
both are false; or
both are strings, and are the same codepoint-for-codepoint; or
both are numbers, and have the same mathematical value; or
both are arrays, and have an equal value item-for-item; or
both are objects, and each property in one has exactly one property with a key equal to the other's, and that other property has an equal value.

Implied in this definition is that arrays must be the same length, objects must have the same number of members, properties in objects are unordered, there is no way to define multiple properties with the same key, and mere formatting differences (indentation, placement of commas, trailing zeros) are insignificant.



#### 4.2.3 实例相等

当且仅当两个JSON实例类型相同且根据数据模型具有相同值时，两个JSON实例是相等的。具体来说,这意味着:

两者都是零;或
两者都是true的;或
两者都是false的;或
它们都是字符串，并且是相同的码点对码点;或
它们都是数字，具有相同的数学值;或
它们都是数组，并且具有相等的项对项的值;或
它们都是对象，一个属性中的每个属性都有一个键值等于另一个键值的属性，而另一个属性的值也相等。

该定义暗示数组必须相同长度，对象必须具有相同数量的成员，对象中的属性是无序的，无法定义具有相同键的多个属性，仅仅是格式差异(缩进、逗号的位置、后面的零)是不重要的。


### 4.3 JSON Schema Documents

A JSON Schema document, or simply a schema, is a JSON document used to describe an instance. A schema is itself interpreted as an instance, but SHOULD always be given the media type "application/schema+json" rather than "application/schema-instance+json". The "application/schema+json" media type is defined to offer a superset of the media type parameter and fragment identifier syntax and semantics provided by "application/schema-instance+json".


### 4.3 JSON Schema 文档

JSON Schema文档，或者简称为Schema，是用于描述实例的JSON文档。模式本身被解释为一个实例，但是应该总是给媒体类型“application/schema+json”，而不是“application/schema-instance+json”。定义“application/schema+json”媒体类型是为了提供“application/schema-instance+json”提供的媒体类型参数和片段标识符语法和语义的超集。


#### 4.3.1 JSON Schema Values and Keywords

A JSON Schema MUST be an object or a boolean.

Object properties that are applied to the instance are called keywords, or schema keywords. Broadly speaking, keywords fall into one or both of two categories:

assertions:
produce a boolean result when applied to an instance
annotations:
attach information to an instance for application use

Keywords may fall into either or both categories. Extension keywords, meaning those defined outside of this document and its companions, are free to define other behaviors as well.

The boolean schema values "true" and "false" are trivial assertions that always return themselves regardless of the instance value. As an example, in terms of the validation vocabulary, boolean schemas are equivalent to the following behaviors:

true:
Always passes validation, as if the empty schema {}
false:
Always fails validation, as if the schema { "not":{} }

A JSON Schema MAY contain properties which are not schema keywords. Unknown keywords SHOULD be ignored.

An empty schema is a JSON Schema with no properties, or only unknown properties.


#### 4.3.1 JSON Schema值和关键字


JSON Schema 必须是一个对象或布尔值

应用于实例的对象属性称作关键字，或Schema关键字。广义地说，关键字可以分为两种类别。

断言：
    当应用于一个实例时，返回一个布尔结果

注解：
    为应用中的实例添加一些信息

关键字可能是其中的一种类别，也可能两种都占。扩展关键字，即在本文档及其附属文档之外定义的关键字，也可以自由定义其他行为。

boolean Schema的值“true”和“false”是一些无关紧要的断言，它们总是返回自己，而不管实例值是什么。例如，在验证词汇表方面，布尔模式等价于以下行为:

正确的:
总是通过验证，就像空Schema{}
错误的:
验证总是失败，就好像Schema{“not”:{}}
JSONSchema可能包含不是模式关键字的属性。未知的关键字应该被忽略。

#### 4.3.2 JSON Schema Vocabularies

A JSON Schema vocabulary is a set of keywords defined for a particular purpose.The vocabulary specifies the meaning of its keywords as assertions, annotations, and/or any vocabulary-defined keyword category.The two companion standards to this document each define a vocabulary: One for instance validation, and one for hypermedia annotations. Vocabularies are the primary mechanism for extensibility within the JSON Schema media type.

Vocabularies may be defined by any entity. Vocabulary authors SHOULD take care to avoid keyword name collisions if the vocabulary is intended for broad use, and potentially combined with other vocabularies. JSON Schema does not provide any formal namespacing system, but also does not constrain keyword names, allowing for any number of namespacing approaches.


Vocabularies may build on each other, such as by defining the behavior of their keywords with respect to the behavior of keywords from another vocabulary, or by using a keyword from another vocabulary with a restricted or expanded set of acceptable values. Not all such vocabulary re-use will result in a new vocabulary that is compatible with the vocabulary on which it is built. Vocabulary authors SHOULD clearly document what level of compatibility, if any, is expected.


A schema that itself describes a schema is called a meta-schema. Meta-schemas are used to validate JSON Schemas and specify which vocabulary it is using. 

#### 4.3.2 JSON Schema 词汇表

JSON Schema词汇表使一些定义了特定用途关键字的合集。词汇表将其关键字的含义指定为断言、注释和/或任何词汇定义的关键字类别。本文附带的两个标准各自定义了一个词汇表:一个用于实例验证，另一个用于超媒体注释。词汇表是JSON Schema媒体类型中可扩展性的主要机制。

词汇表可以由任何实体定义。如果词汇表是用于广泛使用的，并且可能与其他词汇结合在一起，那么词汇表作者应该注意避免关键字名称冲突。JSON Schema不提供任何正式的名称空间系统，但也不限制关键字名称，允许使用任意数量的名称空间方法。

词汇表可以相互构建，例如通过定义其关键字相对于来自另一个词汇表的关键字的行为，或者通过使用来自另一个词汇表的关键字，并使用一组受限制或扩展的可接受值。并不是所有这些词汇的重用都会产生与构建它的词汇兼容的新词汇。词汇表作者应该清楚地记录期望的兼容性级别(如果有的话)。

用于描述Schema的Schema称为元Schema。元Schema用于校验JSON Schema并且规定其使用词汇表。


#### 4.3.3 Root Schema and Subschemas

The root schema is the schema that comprises the entire JSON document in question.

Some keywords take schemas themselves, allowing JSON Schemas to be nested.

As with the root schema, a subschema is either an object or a boolean.

#### 4.3.3 根Schema和子Schema

根Schema是包含所讨论的整个JSON文档的Schema。

一些关键字本身带有Schema，允许嵌套JSON模Schema

与根Schema一样，子模式要么是对象，要么是布尔值。



## 5 Fragment Identifiers
In accordance with section 3.1 of [RFC6839], the syntax and semantics of fragment identifiers specified for any +json media type SHOULD be as specified for "application/json". (At publication of this document, there is no fragment identification syntax defined for "application/json".)

Additionally, the "application/schema+json" media type supports two fragment identifier structures: plain names and JSON Pointers. The "application/schema-instance+json" media type supports one fragment identifier structure: JSON Pointers.

The use of JSON Pointers as URI fragment identifiers is described in RFC 6901 [RFC6901]. For "application/schema+json", which supports two fragment identifier syntaxes, fragment identifiers matching the JSON Pointer syntax, including the empty string, MUST be interpreted as JSON Pointer fragment identifiers.

Per the W3C's best practices for fragment identifiers [W3C.WD-fragid-best-practices-20121025], plain name fragment identifiers in "application/schema+json" are reserved for referencing locally named schemas. All fragment identifiers that do not match the JSON Pointer syntax MUST be interpreted as plain name fragment identifiers.

Defining and referencing a plain name fragment identifier within an "application/schema+json" document are specified in the "$id" keyword [id-keyword] section.
## 5 片段标识符

根据[RFC6839]第3.1节，为任何+json媒体类型指定的片段标识符的语法和语义应按照“application/json”指定。(本文档发布时，没有为“application/json”定义片段标识语法。)

此外，“应用程序/模式+json”媒体类型支持两个片段标识符结构:纯名称和json指针。“应用程序/模式实例+json”媒体类型支持一个片段标识符结构:json指针。

在RFC6901 [RFC6901]中描述了JSON指针作为URI片段标识符的使用。对于支持两个片段标识符语法的“application/schema+json”，匹配json指针语法(包括空字符串)的片段标识符必须解释为json指针片段标识符。

根据W3C的片段标识符最佳实践[W3C]。wd -fragid-best-practice -20121025]，“application/schema+json”中的纯名称片段标识符保留用于引用本地命名的模式。所有不匹配JSON指针语法的片段标识符必须解释为纯名称片段标识符。

定义和引用“应用程序/模式+json”文档中的纯名称片段标识符在“$id”关键字[id-关键字]部分中指定。

## 6. General Considerations


### 6.1 Range of JSON Values

An instance may be any valid JSON value as defined by JSON [RFC7159]. JSON Schema imposes no restrictions on type: JSON Schema can describe any JSON value, including, for example, null.


### 6.2 Programming Language Independence

JSON Schema is programming language agnostic, and supports the full range of values described in the data model. Be aware, however, that some languages and JSON parsers may not be able to represent in memory the full range of values describable by JSON.

### 6.3 Mathematical Integers

Some programming languages and parsers use different internal representations for floating point numbers than they do for integers.

For consistency, integer JSON numbers SHOULD NOT be encoded with a fractional part.

### 6.4 Extending JSON Schema


Implementations MAY define additional keywords to JSON Schema. Save for explicit agreement, schema authors SHALL NOT expect these additional keywords to be supported by peer implementations. Implementations SHOULD ignore keywords they do not support.

Authors of extensions to JSON Schema are encouraged to write their own meta-schemas, which extend the existing meta-schemas using "allOf". This extended meta-schema SHOULD be referenced using the "$schema" keyword, to allow tools to follow the correct behaviour.

Note that the recursive nature of meta-schemas requires re-defining recursive keywords in the extended meta-schema, as can be seen in the JSON Hyper-Schema meta-schema.



## 6. 一般考虑

### 6.1 JSON值的范围

实例可以是JSON [RFC7159]定义的任何有效JSON值。JSON模式对类型没有任何限制:JSON模式可以描述任何JSON值，例如，包括null。

### 6.2 编程语言依赖

JSON模式是与编程语言无关的，它支持数据模型中描述的所有值。但是，请注意，一些语言和JSON解析器可能无法在内存中表示JSON可描述的所有值。


### 6.3 数学整数

一些编程语言和解析器对浮点数使用不同于整数的内部表示。

为了保持一致性，整数JSON数字不应该用小数部分编码。


### 6.4 JSON Schema


实现可以为JSON Schema定义额外的关键字。除了显式一致， Schema作者不期望这些额外的关键字得到对等实现的支持。实现应该忽略它们不支持的关键字。

我们鼓励JSON Schema扩展的作者编写自己的元 Schema，这些元 Schema使用“allOf”扩展现有的元 Schema。应该使用“$schema”关键字引用这个扩展的元 Schema，以允许工具遵循正确的行为。

注意，元 Schema的递归本质要求在扩展元 Schema中重新定义递归关键字，这一点在JSON超 Schema元 Schema中可以看到。




## 7. The "$Schema" Keyword

The "$schema" keyword is both used as a JSON Schema version identifier and the location of a resource which is itself a JSON Schema, which describes any schema written for this particular version.

The value of this keyword MUST be a URI [RFC3986] (containing a scheme) and this URI MUST be normalized. The current schema MUST be valid against the meta-schema identified by this URI.

If this URI identifies a retrievable resource, that resource SHOULD be of media type "application/schema+json".

The "$schema" keyword SHOULD be used in a root schema. It MUST NOT appear in subschemas.

Values for this property are defined in other documents and by other parties. JSON Schema implementations SHOULD implement support for current and previous published drafts of JSON Schema vocabularies as deemed reasonable.

## 7 "$Schema" 关键字

“$schema”关键字既可用作JSON Schema版本标识符，也可用作资源的位置(资源本身就是JSON SChema)，后者描述为该特定版本编写的任何Schema。

这个关键字的值必须是URI [RFC3986](包含一个方案)，并且这个URI必须标准化。当前Schema必须对这个URI标识的元Schema有效。

如果这个URI标识了一个可检索的资源，则该资源应该是媒体类型“application/schema+json”。


“$schema”关键字应该在根Schema中使用。它不能出现在子Schema中。

此属性的值由其他文档和其他各方定义。并且，JSONSChema实现应该实现对当前和以前发布的JSON SChema词汇表草案的支持。



## 8. Base URI and Dereferencing
To differentiate between schemas in a vast ecosystem, schemas are identified by URI, and canembed references to other schemas by specifying their URI.

## 8. 基础URI和间接引用








