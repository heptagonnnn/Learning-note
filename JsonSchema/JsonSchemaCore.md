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

JSON Schema is only defined over JSON documents. However, any document or memory structrue that can be parsed into or processed according to the JSON Schema data moel can be interpreted against a JSON Schema, including media types like CBOR[RFC7049].


### 4.1 JSON文档

JSON文档是一种由application/json媒体类型描述的信息源(八进制序列)。

在JSON Schema中，“JSON文档”， “JSON文本”和“JSON值”是可以互换的，因为他们定义了相同的数据模型。

JSON Schema